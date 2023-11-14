package kosa.afnica.backend.db.dto.car;

import kosa.afnica.backend.db.entity.CarType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CarTypeResDto {
    private Long id;
    private String name;
    private String logo;

    public CarTypeResDto(CarType carType) {
        this.id = carType.getId();
        this.name = carType.getName();
        this.logo = carType.getSrc();
    }
}
