package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.entity.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {

    void save(Member member);

    void saveAdmin(Member member);

    Member findById(String id);

    Member findByEmail(String email);

    String findRoleByEmail(String email);

    int existByEmail(String email);

    int existByName(String name);

    void update(Member member);

}
