import User from "../models/User.js";
import { Webhook } from 'svix';

const clerkWebhooks = async (req, res) => {
  try {
    // Verify webhook signature
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify webhook
    await whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    // Validate required data
    if (!data || !data.id) {
      return res.status(400).json({ success: false, message: "Invalid webhook data" });
    }

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || null,
      username: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      image: data.image_url || null,
    };

    // Handle different webhook events
  switch (type) {
  case "user.created":
    console.log("👉 Creating user in DB:", userData);
    await User.create(userData);
    break;

  case "user.updated":
    console.log("🔄 Updating user:", data.id);
    await User.findByIdAndUpdate(data.id, userData, { new: true, upsert: true });
    break;

  case "user.deleted":
    console.log("🗑️ Deleting user:", data.id);
    await User.findByIdAndDelete(data.id);
    break;

  default:
    console.log(`⚠️ Unhandled event type: ${type}`);
    return res.status(200).json({ success: true, message: "Event not handled" });
}


    res.status(200).json({ success: true, message: "Webhook processed successfully" });

  } catch (error) {
    console.error("Webhook error:", error.message);
    
    // Differentiate between validation errors and server errors
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    
    res.status(statusCode).json({ 
      success: false,
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

export default clerkWebhooks;