package kosa.afnica.backend.db.dto.car;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Base64;

@Getter
@NoArgsConstructor
public class CarResDto {

    private Long carId;
    private String carName;
    private byte[] logo;
    private String photo;

    public void setPhoto() {
        this.photo = Base64.getEncoder().encodeToString(this.logo);
        logo = null;
    }
}