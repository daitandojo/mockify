export default (req, res) => {
  res.json({ nodeVersion: process.version });
};