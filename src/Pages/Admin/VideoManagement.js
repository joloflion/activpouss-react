import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Spin,
  Image,
  Upload,
  message,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVideos,
  addVideo,
  deleteVideo,
  updateVideo,
} from "../../Redux/features/Product/VideoSlice";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import slugify from "slugify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../constants/firebase-config";
import { fetchCategories } from "../../Redux/features/Category/CategorySlice";

const VideoManagement = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.videos);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [viewVideo, setViewVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]); // State for uploaded files
  const videoRef = useRef(null);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    setLoading(true);
    try {
      dispatch(fetchVideos());
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const showAddVideoModal = () => {
    setCurrentVideo(null);
    form.resetFields();
    setFileList([]); // Reset file list
    setIsModalVisible(true);
  };

  const showEditVideoModal = (video) => {
    setCurrentVideo(video);
    form.setFieldsValue({
      title: video.title,
      slug: video.slug,
      description: video.description,
      videoUrl: video.videoUrl,
      coverImageUrl: video.coverImageUrl[0],
    });
    setFileList([
      {
        uid: "-1",
        name: "cover-image",
        status: "done",
        url: video.coverImageUrl[0],
      },
    ]);
    setIsModalVisible(true);
  };

  const showViewVideoModal = (video) => {
    setViewVideo(video);
    setIsViewModalVisible(true);
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      values['category'] = [values.category];
      values.category.push('all')
      // If a file is uploaded, get the URL (you need to handle file upload to a server)
      const coverImageUrl = await uploadImages([values.coverImageUrl] || []);

      const data = {
        title: values.title,
        slug: values.slug || slugify(values.title, { lower: true }),
        description: values.description,
        videoUrl: values.videoUrl,
        coverImageUrl,
        categories: values.category
      };

      if (currentVideo) {
        // Edit video
        dispatch(updateVideo({ id: currentVideo.id, ...data }));
      } else {
        // Add video
        console.log(data);
        dispatch(addVideo(data));
      }

      setIsModalVisible(false);
      toast.success("Vidéo enregistrée avec succès!", { autoClose: 1000 });
      fetchData(); // Refresh data
    } catch (error) {
      console.log("Validation Failed:", error);
    } finally {
      setLoading(false);
    }
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
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description?.split(" ");
    if (words && words?.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  const showDeleteConfirm = (video) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cette vidéo?",
      content: "Cette action est irréversible.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: async () => {
        setLoading(true);
        try {
          dispatch(deleteVideo(video.id));
          fetchData(); // Refresh data
        } catch (error) {
          console.error("Failed to delete video:", error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Upload configuration
  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      // Validate file type and size
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Vous ne pouvez télécharger que des fichiers image!");
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("L'image doit être inférieure à 2MB!");
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false; // Prevent automatic upload
    },
    fileList,
  };

  const columns = [
    {
      title: "Titre",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => truncateDescription(text, 100),
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="bg-info"
            icon={<EyeOutlined />}
            onClick={() => showViewVideoModal(record)}
          />
          <Button
            type="primary"
            className="bg-success"
            icon={<EditOutlined />}
            onClick={() => showEditVideoModal(record)}
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
      <Spin spinning={loading} tip="Loading...">
        <Card
          type="inner"
          title="Liste Vidéos"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showAddVideoModal}
            >
              Ajouter une vidéo
            </Button>
          }
        >
          <Table dataSource={videos} columns={columns} rowKey="id" />
        </Card>
      </Spin>

      <Modal
        title={currentVideo ? "Modifier la vidéo" : "Ajouter une vidéo"}
        open={isModalVisible}
        onOk={handleOk}
        okText="Valider"
        cancelText="Annuler"
        closable={false}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="videoForm">
          <Form.Item
            name="category"
            label="Catégorie"
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner une catégorie",
              },
            ]}
          >
            <Select>
              {categories.map((cat) => (
                <Select.Option key={cat.value} value={cat.value}>
                  {cat.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            label="Titre de la vidéo"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le titre de la vidéo",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: false,
                message: "Veuillez entrer la description de la vidéo",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="videoUrl"
            label="URL de la vidéo"
            rules={[
              { required: true, message: "Veuillez entrer l'URL de la vidéo" },
            ]}
          >
            <Input placeholder="Entrez l'URL de la vidéo" />
          </Form.Item>
          <Form.Item
            name="coverImageUrl"
            label="Image de couverture"
            rules={[
              {
                required: true,
                message: "Veuillez télécharger une image de couverture",
              },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              multiple
            >
              <Button icon={<UploadOutlined />}>Charger une image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Détails de la vidéo"
        open={isViewModalVisible}
        onCancel={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
          setIsViewModalVisible(false);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
              }
              setIsViewModalVisible(false);
            }}
          >
            Fermer
          </Button>,
        ]}
      >
        {viewVideo && (
          <>
            <p>
              <strong>Titre:</strong> {viewVideo.title}
            </p>
            <p>
              <strong>Description:</strong> {viewVideo.description}
            </p>
            <p>
              <strong>Image de couverture:</strong>
            </p>
            <p>
              <strong>Vidéo:</strong>
            </p>
            <video ref={videoRef} controls width="100%">
              <source
                src={viewVideo?.videoUrl?.replace(/"/g, " ")?.trim()}
                type="video/mp4"
              />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </>
        )}
      </Modal>
    </div>
  );
};

export default VideoManagement;
