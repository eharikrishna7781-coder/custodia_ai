/**
 * Stateless tracking. Client passes user + clinic coords, transport ETAs,
 * and dispatch timestamp; we compute vehicle position + remaining ETA.
 * Body: { userLat, userLng, clinicLat, clinicLng, etaPickup, etaDestination, dispatchTime }
 */
export async function POST(request) {
  try {
    const {
      userLat, userLng, clinicLat, clinicLng,
      etaPickup = 10, etaDestination = 20, dispatchTime,
    } = await request.json();

    if (userLat == null || userLng == null) {
      return Response.json({ error: 'Missing coordinates' }, { status: 400 });
    }

    const elapsedMs = dispatchTime ? Date.now() - new Date(dispatchTime).getTime() : 0;
    const elapsedMinutes = Math.floor(elapsedMs / 60000);
    const progress = Math.min(elapsedMinutes / Math.max(etaPickup, 1), 1);

    const clinicOffset = (clinicLat != null && clinicLng != null)
      ? { lat: clinicLat - userLat, lng: clinicLng - userLng }
      : { lat: 0.01, lng: 0.01 };

    return Response.json({
      vehicle_lat: userLat + clinicOffset.lat * progress,
      vehicle_lng: userLng + clinicOffset.lng * progress,
      eta_pickup: Math.max(1, etaPickup - elapsedMinutes),
      eta_destination: Math.max(5, etaDestination - elapsedMinutes),
      progress: Math.round(progress * 100),
      status: progress >= 1 ? 'arrived' : 'en_route',
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
