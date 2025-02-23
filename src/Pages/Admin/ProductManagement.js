import React, { useState, useEffect } from "react";
import { Card, Table, Button, Space, Modal, Form, Input, InputNumber, Upload, Select, Checkbox, Spin, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, deleteProduct, updateProduct } from "../../Redux/features/Product/ProductSlice";
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { storage } from "../../constants/firebase-config";
import { fetchCategories } from "../../Redux/features/Category/CategorySlice";

const ProductManagement = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [currentProduct, setCurrentProduct] = useState(null);
    const [viewProduct, setViewProduct] = useState(null);
    const [loading, setLoading] = useState(false); // State for loader

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const fetchData = async () => {
        setLoading(true); // Start loading
        try {
            dispatch(fetchProducts());
            dispatch(fetchCategories())
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const showAddProductModal = () => {
        setCurrentProduct(null); // Reset current product for adding
        form.resetFields();
        setIsModalVisible(true);
    };

    const showEditProductModal = (product) => {
        setCurrentProduct(product);
        form.setFieldsValue({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product?.category[0],
            isVedette: product?.category?.includes('vedette'),
            isNew: product?.category?.includes('new'),
            isAll: product?.category?.includes('all'),
            isChild: product?.category?.includes('child'),
            isAdult: product?.category?.includes('adult'),
            wall: product?.wall || 'no', // Set wall value (default to 'no')
            images: product?.images?.map(url => ({
                uid: url, // unique identifier for the image
                name: url.split('/').pop(), // use the filename from URL
                status: 'done', // status to show the image as uploaded
                url // URL of the image
            }))
        });
        setIsModalVisible(true);
    };

    const showViewProductModal = (product) => {
        setViewProduct(product);
        setIsViewModalVisible(true);
    };

    const handleOk = async () => {
        try {
            setLoading(true); // Start loading
            const values = await form.validateFields();
            values['category'] = [values.category];
            values['type'] = [];

            if (values.isVedette) {
                values.category.push('vedette');
                values.type.push('vidette');
            }

            if (values.isNew) {
                values.category.push('new');
                values.type.push('new');
            }

            if (values.isAll) {
                values.category.push('all');
                values.type.push('all');
            }

            if (values.isChild) {
                values.category.push('child');
                values.type.push('child');
            }

            if (values.isAdult) {
                values.category.push('adult');
                values.type.push('adult');
            }

            const data = {
                title: values.title,
                price: values.price,
                category: values.category,
                description: values.description,
                images: values.images,
                type: values.type,
                wall: values.wall // Include wall value in the data
            };

            // Handle image upload
            const imageUrls = await uploadImages(values.images || []);

            if (currentProduct) {
                // Edit product
                dispatch(updateProduct({ id: currentProduct.id, ...data, images: imageUrls }));
            } else {
                // Add product
                dispatch(addProduct({ ...data, images: imageUrls }));
            }

            setIsModalVisible(false);
            toast.success('Produit enregistré avec succès!', { autoClose: 1000 });
            fetchData(); // Refresh data
        } catch (error) {
            console.log("Validation Failed:", error);
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
                    // If the file already has a URL, just push it to the imageUrls array
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

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return description;
    };

    const showDeleteConfirm = (product) => {
        Modal.confirm({
            title: 'Êtes-vous sûr de vouloir supprimer ce produit?',
            content: 'Cette action est irréversible.',
            okText: 'Oui',
            okType: 'danger',
            cancelText: 'Non',
            onOk: async () => {
                setLoading(true); // Start loading
                try {
                    await dispatch(deleteProduct(product.id));
                    fetchData(); // Refresh data
                } catch (error) {
                    console.error("Failed to delete product:", error);
                } finally {
                    setLoading(false); // Stop loading
                }
            },
        });
    };

    const columns = [
        {
            title: 'Images',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <Space>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Product ${index}`} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    ))}
                </Space>
            ),
        },
        {
            title: 'Nom',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Prix',
            dataIndex: 'price',
            key: 'price',
            width: '130px',
            render: (price) => `${price} cfa`, // Assuming price is in dollars
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => truncateDescription(text, 100),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        className="bg-info"
                        icon={<EyeOutlined />}
                        onClick={() => showViewProductModal(record)}
                    />
                    <Button
                        type="primary"
                        className="bg-success"
                        icon={<EditOutlined />}
                        onClick={() => showEditProductModal(record)}
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
                    title="Liste Produits"
                    extra={
                        <Button type="primary" icon={<PlusOutlined />} onClick={showAddProductModal}>
                            Ajouter un produit
                        </Button>
                    }
                >
                    <Table dataSource={products} columns={columns} rowKey="id" />
                </Card>
            </Spin>

            <Modal
                title={currentProduct ? "Modifier le produit" : "Ajouter un produit"}
                open={isModalVisible}
                onOk={handleOk}
                okText='Valider'
                cancelText='Annuler'
                closable={false}
                onCancel={handleCancel}
                okButtonProps={{ disabled: loading }} // Disable the OK button when loading
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="productForm"
                >
                    <Form.Item
                        name="category"
                        label="Catégorie"
                        rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
                    >
                        <Select>
                            {categories.map((cat) => (
                                <Select.Option key={cat.value} value={cat.value}>
                                    {cat.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <div>Ranger dans: </div>
                    <div className="d-flex justify-content-start align-items-center">
                        <Form.Item name="isVedette" valuePropName="checked">
                            <Checkbox>Vedette</Checkbox>
                        </Form.Item>
                        <Form.Item name="isNew" className="ms-4" valuePropName="checked">
                            <Checkbox>Nouveau</Checkbox>
                        </Form.Item>
                        <Form.Item name="isAll" className="ms-4" valuePropName="checked">
                            <Checkbox>Tout</Checkbox>
                        </Form.Item>
                    </div>
                    <div>Age: </div>
                    <div className="d-flex justify-content-start align-items-center">
                        <Form.Item name="isChild" valuePropName="checked">
                            <Checkbox>Enfants</Checkbox>
                        </Form.Item>
                        <Form.Item name="isAdult" className="ms-4" valuePropName="checked">
                            <Checkbox>Adultes</Checkbox>
                        </Form.Item>
                    </div>

                    <div>Afficher sur le mur : </div>
                    <div className="d-flex justify-content-start align-items-center">
                        <Form.Item name="wall" initialValue="no">
                            <Radio.Group>
                                <Radio value="yes">Oui</Radio>
                                <Radio value="no">Non</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="title"
                        label="Nom du produit"
                        rules={[{ required: true, message: 'Veuillez entrer le nom du produit' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Prix"
                        rules={[{ required: true, message: 'Veuillez entrer le prix du produit' }]}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Veuillez entrer la description du produit' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="images"
                        label="Images"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Veuillez télécharger au moins une image' }]}
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
                {loading && <Spin indicator={<LoadingOutlined />} />} {/* Show loader inside modal */}
            </Modal>

            <Modal
                title="Détails du produit"
                open={isViewModalVisible}
                onCancel={() => setIsViewModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsViewModalVisible(false)}>
                        Fermer
                    </Button>,
                ]}
            >
                {viewProduct && (
                    <>
                        <p><strong>Nom:</strong> {viewProduct.title}</p>
                        <p><strong>Prix:</strong> {viewProduct.price} $</p>
                        <p><strong>Description:</strong> {viewProduct.description}</p>
                        <p><strong>Catégorie:</strong> {viewProduct.category.join(', ')}</p>
                        <p><strong>Mur:</strong> {viewProduct.wall === 'yes' ? 'Oui' : 'Non'}</p>
                        <p><strong>Images:</strong></p>
                        <Space>
                            {viewProduct.images.map((image, index) => (
                                <img key={index} src={image} alt={`Product ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            ))}
                        </Space>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default ProductManagement;
