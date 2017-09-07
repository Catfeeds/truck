package com.hyhl.gotosea.core.order.mapper;

import com.hyhl.gotosea.core.common.mapper.MyMapper;
import com.hyhl.gotosea.core.order.po.SerialNumber;
import org.apache.ibatis.annotations.Update;

public interface SerialNumberMapper extends MyMapper<SerialNumber> {

    @Update("UPDATE t_serial_number SET max_serial_numer=#{arg0} WHERE id=#{arg1} AND max_serial_numer=#{arg2}")
    int updtaeSerialNumber(Integer newSerial,Integer id,Integer oldSerial);

}
