package kosa.afnica.backend.db.dto.chatting;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChattingResDto {
    private Long id;
    private String name;

    @Builder
    public ChattingResDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
