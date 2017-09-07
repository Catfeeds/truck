package com.hyhl.gotosea;


import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
public class UtilTest {
    @Test
    public void testUtil() {
//        int machineId = 1;//最大支持1-9个集群机器部署

        for (int i=0;i<1000;i++){

            int hashCodeV = UUID.randomUUID().toString().hashCode();
            if(hashCodeV < 0) {//有可能是hashCodeV = - hashCode}
                // 0 代表前面补充0
                // 4 代表长度为4
                // d 代表参数为正数型
                hashCodeV = - hashCodeV;
            }
            System.out.println(String.format("%010d", hashCodeV));
        }
    }
}
