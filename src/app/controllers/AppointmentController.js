import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(appointments);
  }

  async store(req, res) {
    // -> Validação..
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    // -> Valida os dados do body
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos Inválidos.' });
    }
    // -> Deu certo a validacao, agora pega os seguintes campos..
    const { provider_id, date } = req.body;

    // -> É de suma importancia que seja validado o provider e o provider_id, ambos devem coincidir
    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });
    // -> Se retornar false
    if (!isProvider) {
      return res.status(401).json({
        error: 'Você só pode criar agendamentos com provedores de serviços.',
      });
    }
    //
    // -> Chegagem de Horarios
    //
    // parseIso tranforma a string repassada em um objeto em um date do javascript
    // o startofhour pega o inicio da hora, se tiver 19:30 ele vai pegar 19:00..
    const hourStart = startOfHour(parseISO(date));
    // -> hourStart esta antes da data atual?
    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Datas anteriores não são permitidas' });
    }
    //
    // -> Agendamento no mesmo horario?
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    // -> se ele encontrou o agendamento significa que o horarios NÃO está vago..
    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'A data do agendamento não está disponível.' });
    }
    //
    // -> Se passou por todas as validacoes agora sim é criado o agendamento
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });
    return res.json(appointment);
  }
}

export default new AppointmentController();
