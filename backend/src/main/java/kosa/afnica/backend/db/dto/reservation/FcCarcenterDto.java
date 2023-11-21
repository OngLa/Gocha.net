package kosa.afnica.backend.db.dto.reservation;

import lombok.Getter;
import lombok.NoArgsConstructor;

//주정비소 출력 dto
@Getter
@NoArgsConstructor
public class FcCarcenterDto {

    private Long id;
    private Long carcenterId;
    private String phoneNumber;
    private String address;

    public FcCarcenterDto(Long id, Long carcenterId, String phoneNumber, String address) {
        this.id = id;
        this.carcenterId = carcenterId;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
