package kosa.afnica.backend.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class CarData {
    Long id;

    Integer canGoDistance;
    Integer distance;
    Integer carBattery;
    Boolean batteryCharge;
    Boolean breakOil;
    Boolean engineOil;
    Boolean oil;
    Boolean tire;
    Boolean washer;
    Boolean lampWire;

    Timestamp lastUpdate;
    Long carId;

}
