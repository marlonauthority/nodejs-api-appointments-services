import * as Yup from 'yup';
import User from '../models/User';
import Appointment from '../models/Appointment';

class AppointmentController {
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
