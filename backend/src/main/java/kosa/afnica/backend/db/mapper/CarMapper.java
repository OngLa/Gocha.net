package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.entity.CarBrand;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CarMapper {
    void insertBrand(CarBrand carBrand);

    List<CarBrand> getBrandList();

}
