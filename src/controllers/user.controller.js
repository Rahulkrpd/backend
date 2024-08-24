import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import validator from "validator";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async (req, res) => {
    /// take input from user  (get user details from frontend)
    // check every input field is filled with desired values (validation)
    // check for existing user or not  :username ,email
    // check for images , check for avatar
    // upload them to cloudinary,avatar
    // save the user in database ( create user object )
    // remove password nd refresh token field from response
    // check for user creation
    // return  send a message to the user 

    const { username, fullname, email, password } = req.body;
    console.log(email, "email");

    // if (fullname === "") {
    //     throw new ApiError(400, "Full name is required")
    // }

    if (
        [fullname, username, email, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All field are required")
    }

    if (!validator.isEmail(email)) {
        throw new ApiError(400, "Enter valid email")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exist")
    }


    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path




    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(avatarLocalPath)


    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // here we checking user created or not and password and  refreshToken remove from response as per requirement

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )



})

const login = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "ok" })
})




export { registerUser, login }