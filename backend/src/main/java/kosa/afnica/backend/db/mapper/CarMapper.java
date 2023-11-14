package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.entity.Brand;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CarMapper {
    void insertBrand(Brand brand);

    List<Brand> getBrandList();

}
