import { Request, Response } from "express";
import { Appointment } from "../entities";
import { ForbiddenError, subject } from "@casl/ability";
import {
  insertAppointment,
  validateSlot,
  getAppointmentsQuery,
  getTaken,
  findOneAndValidateForRemoval,
} from "../services/appointment";

export const getAppointments = async (req: Request, res: Response) => {
  try {
    let appointments = await getAppointmentsQuery(req.id);
    if (appointments) {
      if (appointments.length > 0)
        ForbiddenError.from(req.ability).throwUnlessCan(
          "read",
          subject("Appointment", appointments)
        );
      return res.status(200).json(appointments);
    } else
      return res.status(400).json({
        error: [
          {
            msg: "No booked appointments",
          },
        ],
      });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const getTakenAppointmentsForDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    let appointments = await getTaken(req.params.docId);
    if (appointments) {
      ForbiddenError.from(req.ability).throwUnlessCan("read", "Appointment");
    }
    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const postAppointment = async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.time || !req.body.date) {
      return res.status(400).json({
        error: [
          {
            msg: "Invalid request body, missing one or more of fields: date, time",
          },
        ],
      });
    }

    let appointment = await insertAppointment(
      req.body,
      req.id,
      req.params.docId
    );

    ForbiddenError.from(req.ability).throwUnlessCan("create", "Appointment");

    const { validate, errorMsg } = await validateSlot(appointment);
    if (validate) {
      const response = await Appointment.save(appointment);
      return res.json(response);
    } else {
      return res.status(400).json({
        error: [
          {
            msg: errorMsg,
          },
        ],
      });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const response = await findOneAndValidateForRemoval(req.params.id);
    const { validate, errorMsg, appointment } = response;
    if (!validate) {
      return res.status(400).json({
        error: [
          {
            msg: errorMsg,
          },
        ],
      });
    }
    if (appointment) {
      ForbiddenError.from(req.ability).throwUnlessCan(
        "delete",
        subject("Appointment", appointment)
      );
      await appointment.remove();
      return res.status(200).json("Appointment deleted");
    } else {
      {
        return res.status(400).json({
          error: [
            {
              msg: "Something went wrong",
            },
          ],
        });
      }
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
