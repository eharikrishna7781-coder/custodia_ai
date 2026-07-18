import { bookAppointmentStateless } from '@/lib/agents';

export async function POST(request) {
  try {
    const { clinic } = await request.json();
    if (!clinic || !clinic.name) {
      return Response.json({ error: 'Clinic details required' }, { status: 400 });
    }
    const result = bookAppointmentStateless(clinic);
    return Response.json({
      appointment: result.appointment,
      clinic: result.clinic,
      message: `Appointment confirmed at ${clinic.name} for ${result.appointment.time}. Do you need transport?`,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
