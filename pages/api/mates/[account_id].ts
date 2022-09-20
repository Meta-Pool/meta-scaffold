// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Mate } from "../../../types/mate.types";
import Mates from "../../../mocks/mates.json"

// Learn more about API routes https://nextjs.org/docs/api-routes/introduction

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { account_id, offset, limit } = req.query as {
    account_id: string;
    offset: string;
    limit: string;
  };

  const params = {
    owner_id: account_id,
    from_index: offset ? parseInt(offset) : 0,
    limit: limit ? parseInt(limit) : 10,
  };
  const result = Mates.filter(m => m.owner_id == account_id)
  res.status(200).json(result);
}
