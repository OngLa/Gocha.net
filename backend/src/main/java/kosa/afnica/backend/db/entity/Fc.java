package kosa.afnica.backend.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor

public class Fc {

    private Long id;
    private Long memberId;
    private Long carcenterId;

    public Fc(Long id, Long memberId, Long carcenterId) {
        this.id = id;
        this.memberId = memberId;
        this.carcenterId = carcenterId;
    }
}
