package kosa.afnica.backend.db.dto.car;

import kosa.afnica.backend.db.entity.Brand;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BrandResDto {
    private Long id;
    private String name;
    private String logo;

    public BrandResDto(Brand brand) {
        this.id = brand.getId();
        this.name = brand.getName();
        this.logo = brand.getSrc();
    }

}
