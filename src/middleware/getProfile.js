/*
 * For debugging purpose: Keep the the ID above 0 if not provided
 * That constant simulates the case when a user is authenticated
 * and has access to resources related them.
 */
const FALLBACK_PROFILE_ID = 0;

const getProfile = async (req, res, next) => {
    const { Profile } = req.app.get('models');
    const profile = await Profile.findOne({
        where: { id: req.get('profile_id') || FALLBACK_PROFILE_ID },
    });
    if (!profile) return res.status(401).end();
    req.profile = profile;
    next();
};

module.exports = { getProfile };
