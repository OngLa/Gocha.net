package kosa.afnica.backend.db.entity;
import java.util.Date;
import lombok.*;

@Getter
@NoArgsConstructor
public class Reservation {
    private Long id;
    private String state;
    private Date reservedDate;
    private Long memberId;
    private Long carcenterId;
    private Long carDataId;
}
