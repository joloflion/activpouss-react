import React, { useState, useEffect } from "react";
import { Card, Table, Button, Space, Modal, Form, Input, Upload, Spin } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, addCategory, deleteCategory, updateCategory } from "../../Redux/features/Category/CategorySlice";
import { toast } from "react-toastify";
import slugify from "slugify";
import { storage } from "../../constants/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false); // State for loader

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const showAddCategoryModal = () => {
    setCurrentCategory(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const showEditCategoryModal = (category) => {
    setCurrentCategory(category);
    const initialFileList = category.images?.map(url => ({
      uid: url,
      name: url.split('/').pop(),
      status: 'done',
      url
    }));
    form.setFieldsValue({
      title: category.title,
      slug: category.slug,
      images: initialFileList,
    });
    setFileList(initialFileList || []);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      setLoading(true); // Start loading
      const values = await form.validateFields();
      const imageUrls = await uploadImages(values.images || []);

      const data = {
        title: values.title,
        slug: values.slug || slugify(values.title, { lower: true }),
        images: imageUrls,
        value: currentCategory ? currentCategory.value : uuidv4(),
      };

      if (currentCategory) {
        dispatch(updateCategory({ id: currentCategory.id, ...data }));
      } else {
        dispatch(addCategory(data));
      }

      setIsModalVisible(false);
      toast.success("Catégorie enregistrée avec succès!", { autoClose: 1000 });
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Validation Failed:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const uploadImages = async (images) => {
    const imageUrls = [];

    await Promise.all(
      images.map(async (file) => {
        if (file.url) {
          imageUrls.push(file.url);
        } else {
          const imageRef = ref(storage, `images/${uuidv4()}`);
          await uploadBytes(imageRef, file.originFileObj);
          const url = await getDownloadURL(imageRef);
          imageUrls.push(url);
        }
      })
    );

    return imageUrls;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const showDeleteConfirm = (category) => {
    Modal.confirm({
      title: 'Êtes-vous sûr de vouloir supprimer cette catégorie?',
      content: 'Cette action est irréversible.',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk: async () => {
        setLoading(true); // Start loading
        try {
          await dispatch(deleteCategory(category.id));
          fetchData(); // Refresh data
        } catch (error) {
          console.error("Failed to delete category:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      },
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <Space>
          {images?.map((image, index) => (
            <img key={index} src={image} alt={`Category ${index}`} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
          ))}
        </Space>
      ),
    },
    {
      title: "Nom",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: <div className="w-100 text-end">Actions</div>,
      key: "action",
      render: (text, record) => (
        <Space size="middle" className="w-100 d-flex justify-content-end">
          <Button
            type="primary"
            className="bg-success"
            icon={<EditOutlined />}
            onClick={() => showEditCategoryModal(record)}
          />
          <Button
            type="primary"
            className="bg-danger"
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <Spin spinning={loading} tip="Loading..."> {/* Add Spin component for loader */}
        <Card
          type="inner"
          title="Liste Catégories"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={showAddCategoryModal}>
              Ajouter une catégorie
            </Button>
          }
        >
          <Table dataSource={categories} columns={columns} rowKey="id" />
        </Card>
      </Spin>

      <Modal
        title={currentCategory ? "Modifier la catégorie" : "Ajouter une catégorie"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Valider"
        cancelText="Annuler"
      >
        <Form form={form} layout="vertical" name="categoryForm">
          <Form.Item
            name="title"
            label="Nom de la catégorie"
            rules={[{ required: true, message: "Veuillez entrer le nom de la catégorie" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: false, message: "Veuillez téléverser une image!" }]}
          >
            <Upload
              maxCount={1}
              listType="picture"
              beforeUpload={() => false}
              accept="image/*"
              fileList={fileList}
              onChange={handleUploadChange}
            >
              <Button 
                icon={<UploadOutlined />} 
                disabled={fileList.length >= 1}
              >
                Téléverser une image
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;