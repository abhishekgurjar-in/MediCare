import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
// Update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to Update" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to Delete" });
  }
};

// Get a single user by ID
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    if (user) {
      res.status(200).json({
        success: true,
        message: "User Found",
        data: user,
      });
    } else {
      res.status(404).json({ success: false, message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to Retrieve User" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to Retrieve Users" });
  }
};
// Get User Profile
export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { password, ...rest } = user._doc; // Exclude password
    res.status(200).json({ success: true, message: 'Profile info retrieved successfully', data: rest });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong, cannot get profile' });
  }
};

// Get My Appointments
export const getMyAppointments = async (req, res) => {
  try {
    // Step 1: Retrieve appointments for the specific user
    const bookings = await Booking.find({ user: req.userId });

    // Step 2: Extract doctor IDs from appointments
    const doctorIds = bookings.map(el => el.doctor);

    // Step 3: Retrieve doctors using doctor IDs
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password');

    res.status(200).json({ success: true, message: 'Appointments retrieved successfully', data: doctors });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong, cannot get appointments' });
  }
};
