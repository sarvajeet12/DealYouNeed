export const adminAuth = (req, res, next) => {

    // x-api-key : custom headers

    const apiKey = req.headers['x-api-key'];

    if (apiKey === process.env.ADMIN_API_KEY) {
        return next();
    }
    return res.status(403).json({ error: "Unauthorized" });
}
