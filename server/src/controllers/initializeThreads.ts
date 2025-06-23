import { Request, Response } from "express";

const initializeThreads = async (req: Request, res: Response) => {
  try {
    res.format({"application/json": () => {
      res.send({
        message: "Threads initialized.",
        data: { byId: {}, allIds: [] }
      });
    }});

  } catch (error) {
    console.error("Failed to initialize threads: ", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export default initializeThreads;