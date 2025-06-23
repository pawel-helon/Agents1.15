import { Request, Response } from "express";
import { pool } from '..';
import { sendResponse } from '../utils/sendResponse';

const createThread = async (req: Request, res: Response) => {
  const { id, userId, agentName } = req.body as { id: string, userId: string, agentName: string };

  try {
    const queryText = `
      WITH agent_info AS (
        SELECT "id" AS "agentId"
        FROM "Agent"
        WHERE "name" = $3::text
          AND "userId" = $2::uuid
      )
      INSERT INTO "Thread" (
        "id",
        "userId",
        "agentId",
        "body"
      )
      SELECT
        $1::uuid,
        $2::uuid,
        agent_info."agentId",
        '{}'::jsonb
      FROM agent_info
      RETURNING *;
    `;
    const result = await pool.query(queryText, [
      id,
      userId,
      agentName
    ])
    if (!result) return sendResponse(res, "Failed to create thread.");

    console.log(result.rows[0]);

    /** Send response to the client */
    res.format({"application/json": () => {
      res.send({
        message: "Thread fetched.",
        data: result.rows[0]
      });
    }});

  } catch (error) {
    console.error("Failed to create thread: ", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export default createThread;