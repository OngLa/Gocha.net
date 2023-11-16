package kosa.afnica.backend.db.entity;

import kosa.afnica.backend.db.dto.car.CarReqDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Car {

    Long id;
    String carNumber;
    Long cartypeId;
    Long memberId;

    public Car(CarReqDto reqDto, Long memberId) {
        this.cartypeId = reqDto.getCartypeId();
        this.carNumber = reqDto.getCarNumber();
        this.memberId = memberId;
    }

}
