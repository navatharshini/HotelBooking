import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

export const protect = ClerkExpressWithAuth({
  onError: (err, req, res, next) => {
    res.status(401).json({ message: "Not authorized" });
  },
  onSuccess: async (req, res, next) => {
    const { userId } = req.auth;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    req.userId = userId;
    next();
  }
});
