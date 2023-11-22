package kosa.afnica.backend.db.dto.chatting;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChattingCarResDto {
    private Long id;
    private String carNumber;

    public ChattingCarResDto(Long id, String carNumber) {
        this.id = id;
        this.carNumber = carNumber;
    }
}
