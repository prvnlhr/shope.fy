import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import bcryptjs from "bcryptjs";

const generateHashedPassword = async (password) => {
  const hashedPassword = await bcryptjs.hash(password, 10);
  return hashedPassword;
};

// SIGNUP NEW USER
export async function POST(req, res) {
  const { fullname, email, password, confirmPassword } = await req.json();

  if (!fullname || !email || !password || !confirmPassword) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 400,
      });
    }
    if (password !== confirmPassword) {
      return new Response(
        JSON.stringify({
          message: "Password and Confirm Password do not match",
        }),
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await generateHashedPassword(password);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword, // Store the hashed password
    });

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        user: { fullname: newUser.fullname, email: newUser.email },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: error, message: "Error in  Signup" }),
      {
        status: 500,
      }
    );
  }
}
