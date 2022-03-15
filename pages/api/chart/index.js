import { chartData } from "../../../chartData";

const KEY = process.env.JWT_KEY;

export default function handler (req, res) {
  const { method } = req;

  if (method === 'GET') {
    return res.status(200).json(chartData);
  }
}