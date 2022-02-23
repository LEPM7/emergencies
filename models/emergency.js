export class Emergency {
  constructor(
    state,
    contactPhone,
    latitude,
    longitude,
    fireStation,
    ambulance,
    name,
    type,
    comments,
    other
  ) {
    this.state = state;
    this.contactPhone = contactPhone;
    this.latitude = latitude;
    this.longitude = longitude;
    this.fireStation = fireStation;
    this.ambulance = ambulance;
    this.name = name;
    this.type = type;
    this.comments = comments;
    this.other = other;
    this.date = new Date();
  }
}
