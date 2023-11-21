package kosa.afnica.backend.db.dto.carData;

import kosa.afnica.backend.db.entity.CarData;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;

@Getter
@NoArgsConstructor
public class CarDataResDto {

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

    String lastUpdate;

    public CarDataResDto(CarData carData) {
        this.canGoDistance = carData.getCanGoDistance();
        this.distance = carData.getDistance();
        this.carBattery = carData.getCarBattery();
        this.batteryCharge = carData.getBatteryCharge();
        this.breakOil = carData.getBreakOil();
        this.engineOil = carData.getEngineOil();
        this.oil = carData.getOil();
        this.tire = carData.getTire();
        this.washer = carData.getWasher();
        this.lampWire = carData.getLampWire();

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        this.lastUpdate = format.format(carData.getLastUpdate());
    }
}
