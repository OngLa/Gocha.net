package kosa.afnica.backend.db.entity;

import kosa.afnica.backend.db.dto.carData.CarDataReqDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Random;

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

    // API 연동 전 임시 데이터 생성(난수)
    public CarData(CarDataReqDto reqDto) {
        long seed = System.currentTimeMillis();
        Random random = new Random(seed);

        this.canGoDistance = random.nextInt(500);
        this.distance = random.nextInt(100000);
        this.carBattery = random.nextInt(100);
        this.batteryCharge = random.nextBoolean();
        this.breakOil = random.nextBoolean();
        this.engineOil = random.nextBoolean();
        this.oil = random.nextBoolean();
        this.tire = random.nextBoolean();
        this.washer = random.nextBoolean();
        this.lampWire = random.nextBoolean();

        this.carId = reqDto.getCarId();
    }
}
