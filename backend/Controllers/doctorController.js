import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
// Update a doctor
export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Doctor successfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update doctor" });
  }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Doctor successfully deleted",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete doctor" });
  }
};

// Get a single doctor by ID
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    if (doctor) {
      res.status(200).json({
        success: true,
        message: "Doctor found",
        data: doctor,
      });
    } else {
      res.status(404).json({ success: false, message: "Doctor not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve doctor" });
  }
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      success: true,
      message: "Doctors found",
      data: doctors,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve doctors" });
  }
};

// Get Doctor profile
export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId; // Ensure you're using the correct variable name here
  try {
    const doctor = await Doctor.findById(doctorId); // Use doctorId instead of userId

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const { password, ...rest } = doctor._doc; // Exclude the password field
    const appointments = await Booking.find({ doctor: doctorId }); // Fetch appointments for the doctor

    res.status(200).json({ 
      success: true, 
      message: 'Profile info retrieved successfully', 
      data: { ...rest, appointments } 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong, cannot get profile' });
  }
}

