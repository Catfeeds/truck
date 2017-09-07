package com.hyhl.gotosea.task;

import org.apache.ibatis.io.VFS;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import com.hyhl.gotosea.core.comm.CommAutoConfiguration;
import com.hyhl.gotosea.core.common.vfs.SpringBootVFS;
import com.hyhl.gotosea.core.cust.CustAutoConfiguration;
import com.hyhl.gotosea.core.local.LocalAutoConfiguration;
import com.hyhl.gotosea.core.order.OrderAutoConfiguration;
import com.hyhl.gotosea.core.prod.ProdAutoConfiguration;
import com.hyhl.gotosea.core.rabbitmq.MQAutoConfiguration;
import com.hyhl.gotosea.core.ref.RefAutoConfiguration;

@Configuration
@ComponentScan
@Import(value={MQAutoConfiguration.class,
			CustAutoConfiguration.class,
			LocalAutoConfiguration.class,
			RefAutoConfiguration.class,
			ProdAutoConfiguration.class,
			OrderAutoConfiguration.class,
		CommAutoConfiguration.class
})
public class TaskAutoConfiguration {
	
	static {
		// 解决myBatis下 不能嵌套jar文件的问题
		VFS.addImplClass(SpringBootVFS.class);
	};
	
}
