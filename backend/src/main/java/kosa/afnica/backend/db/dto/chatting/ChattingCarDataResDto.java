package kosa.afnica.backend.db.dto.chatting;

import com.fasterxml.jackson.annotation.JsonFormat;
import kosa.afnica.backend.db.entity.Car;
import kosa.afnica.backend.db.entity.CarData;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChattingCarDataResDto {
    private Long id;
    private Long carId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime lastUpdate;
}
