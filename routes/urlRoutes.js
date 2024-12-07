const express = require('express');
const Url = require('../models/Url');
const router = express.Router();

router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ message: "Invalid URL" });

    try {
        const url = new Url({ originalUrl });
        await url.save();
        res.json(url);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/getallurls', async (req, res) => {
    try {
        const urls = await Url.find({});
        if (urls) return res.status(200).json({urls});
        res.status(500).json({ message: "URLs List not found" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    try {
        const url = await Url.findOne({ shortId: shortUrl });
        if (url) return res.redirect(url.originalUrl);
        res.status(404).json({ message: "URL not found" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});




module.exports = router;