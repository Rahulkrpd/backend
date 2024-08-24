import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trime: true,
        index: true /// optime search 
    }
    ,
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trime: true,

    },

    fullname: {
        type: String,
        require: true,
        trime: true,
        index: true,

    },

    avatar: {
        type: String,  // cloudinary url
        require: true,

    },
    coverImage: {
        type: String,  // cloudinary url



    },
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"

    }],

    password: {
        type: String,
        require: [true, "Password is required"]

    },

    refreshToken: {
        type: String
    },

}, {
    timestamps: true
})



userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

    next();
});


userSchema.methods.isPasswordCorrect = async function
    (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACESS_TOKEN_EXPIRY
        }
    )
}



userSchema.methods.generateRrefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)