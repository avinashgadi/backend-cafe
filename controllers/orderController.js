import orderModel from "../models/orderModel.js";

const newOrder = async (req, res) => {
  try {
    const body = req.body;
    const result = await orderModel.create(body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await orderModel.find({ email: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showAllOrders = async (req, res) => {
  try {
    const { status = "", page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const count = await orderModel.countDocuments();
    const total = Math.ceil(count / limit);
    const result = await orderModel.find({ status: { $regex: status } });
    res.status(200).json({ orders:result, total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await orderModel.updateOne(
      { _id: id },
      { $set: { status } }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { newOrder, showOrders, showAllOrders, updateOrder };