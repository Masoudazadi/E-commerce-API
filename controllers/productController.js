const Product = require("../models/productModel")
const CustomError = require("../errors")
const { StatusCodes } = require("http-status-codes")
const path = require("path")

// ** ===================  CREATE PRODUCT  ===================
const createProduct = async (req, res) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

// ** ===================  GET ALL PRODUCTS  ===================
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ total_products: products.length, products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
}


// ** ===================  GET SINGLE PRODUCT  ===================
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId }).populate("reviews")
  if (!product) {
    throw new CustomError.BadRequestError(`No product with the id ${productId}`)
  }
  res.status(StatusCodes.OK).json({ product })
}

// ** ===================  UPDATE PRODUCT  ===================
const updateProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    throw new CustomError.BadRequestError(`No product with the id ${productId}`)
  }
  res.status(StatusCodes.OK).json({ product })
}

// ** ===================  DELETE PRODUCT  ===================
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOneAndDelete({ _id: productId })
  if (!product) {
    throw new CustomError.BadRequestError(`No product with the id ${productId}`)
  }
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed" })
}

// ** ===================  UPLOAD IMAGE PRODUCT  ===================
const uploadImage = async (req, res) => {
  //console.log(req.files)
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded")
  }
  const productImage = req.files.image
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image")
  }
  const maxSize = 1024 * 1024
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload image smaller 1MB")
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  )
  await productImage.mv(imagePath)
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
} 

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
