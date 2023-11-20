package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.reservation.FcDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FcMapper {
    void saveFc(FcDto fcDto);
}
