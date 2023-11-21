package kosa.afnica.backend.db.dto.reservation;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class AdminDto {

    private Long id;
    private Long state;
    private Date reservedDate;
    private Long memberId;
    private Long carcenterId;
    private Long carDataId;
    private String phoneNumber;
    private String name;

    public AdminDto(Long id, Long state, Date reservedDate, Long memberId, Long carcenterId, Long carDataId, String phoneNumber, String name) {
        this.id = id;
        this.state = state;
        this.reservedDate = reservedDate;
        this.memberId = memberId;
        this.carcenterId = carcenterId;
        this.carDataId = carDataId;
        this.phoneNumber = phoneNumber;
        this.name = name;
    }
}