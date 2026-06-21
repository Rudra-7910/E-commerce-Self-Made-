import { Address } from "../models/address.js";
import TryCatch from "../utils/TryCatch.js";
export const addAddress = TryCatch(async (req, res) => {
  const { address, phoneNumber } = req.body;
  if (!address || !phoneNumber) {
    return res.status(400).json({
      message: "Phone Number and Address are required",
    });
  }
  const newAddress = await Address.create({
    address,
    phoneNumber,
    user: req.user._id,
  });
  res.status(201).json({
    message: "Address created successfully",
    address: newAddress,
  });
});
export const deleteAddress = TryCatch(async (req, res) => {
  const { id } = req.params;
  const address = await Address.findOne({
    _id: id,
    user: req.user._id,
  });
  if (!address) {
    return res.status(404).json({
      message: "Address not found",
    });
  }
  await address.deleteOne();
  res.status(200).json({
    message: "Address deleted successfully",
  });
});
export const getAllAddress = TryCatch(async (req, res) => {
  const allAddresses = await Address.find({
    user: req.user._id,
  });
  res.status(200).json(allAddresses);
});
export const getSingleAddress = TryCatch(async (req, res) => {
  const { id } = req.params;
  const address = await Address.findOne({
    _id: id,
    user: req.user._id,
  });
  if (!address) {
    return res.status(404).json({
      message: "Address not found",
    });
  }
  res.status(200).json(address);
});
export const updateAddress = TryCatch(async (req, res) => {
  const { id } = req.params;
  const updatedDetails = {};
  const { address, phoneNumber } = req.body;
  if (address) {
    updatedDetails.address = address;
  }
  if (phoneNumber) {
    updatedDetails.phoneNumber = phoneNumber;
  }
  const updatedField = await Address.findOneAndUpdate(
    {
      _id: id,
      user: req.user._id,
    },
    updatedDetails,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedField) {
    return res.status(404).json({
      message: "Address not found",
    });
  }
  res.status(200).json({
    message: "Address updated successfully",
    address: updatedField,
  });
});