package kosa.afnica.backend.db.dto.carData;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CarDataReqDto {

    Long carId;
    LocalDate startDate;
    LocalDate endDate;

    public CarDataReqDto(Long carId, LocalDate startDate, LocalDate endDate) {
        this.carId = carId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
