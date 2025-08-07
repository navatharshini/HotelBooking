import User from "../models/User.js";
import { Webhook } from 'svix';
import { syncUser } from "../utils/syncUser.js"; // <-- Import here

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const payload = JSON.stringify(req.body);
    await whook.verify(payload, headers);

    const { data, type } = req.body;

    if (!data || !data.id) {
      return res.status(400).json({ success: false, message: "Invalid webhook data" });
    }

    switch (type) {
      case "user.created":
        console.log("➡️ Creating new user from webhook:", data.id);
        await syncUser(data.id);  // ✅ Using syncUser here
        break;

      case "user.updated":
        console.log("🔄 Updating user:", data.id);
        const updatedUserData = {
          email: data.email_addresses?.[0]?.email_address || null,
          username: `${data.first_name || ''} ${data.last_name || ''}`.trim() || null,
          image: data.image_url || null,
        };
        await User.findByIdAndUpdate(data.id, updatedUserData, { new: true });
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
    const statusCode = error.name === 'ValidationError' ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

export default clerkWebhooks;
