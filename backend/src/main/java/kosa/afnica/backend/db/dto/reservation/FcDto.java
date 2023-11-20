package kosa.afnica.backend.db.dto.reservation;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FcDto {
    private Long id;
    private Long memberId;
    private Long carcenterId;

    public FcDto(Long memberId, Long carcenterId) {
        this.memberId = memberId;
        this.carcenterId = carcenterId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }


}
