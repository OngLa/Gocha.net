package kosa.afnica.backend.db.dto.reservation;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FcDto {

    private Long id;

    public FcDto(Long id) {
        this.id = id;
    }
}
