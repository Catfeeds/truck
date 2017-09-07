import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import NotFound from 'containers/notFound'
import WrapComponent from 'scripts/wrap'

import LineList from 'containers/line/list';
import Detail from 'containers/line/detail';

const routes = [
//  {
//      verify : true,
//      path : '/coupon',
//      component : CouponApp,
//      routes : [
//          {
//              path : '/coupon/list',
//              component : CouponListApp,
//          },
//          {
//              path : '/coupon/receive',
//              component : CouponReceiveApp
//          }
//      ]
//  },
    {
    	path : '/lineList',
    	component : LineList
    },
    {
    	path : '/detail',
    	component : Detail
    },   
    {
    	path: '*',
        component : NotFound
    },
];

function RouteWithSubRoutes( route, key ){
    return <Route key = { key } path = { route.path } exact = { true } render={ props => {
        if( Array.isArray( route.routes ) && route.routes.length > 0 ){
            return (
                <route.component>
                    <Switch>
                        { route.routes.map( ( v, k ) => RouteWithSubRoutes( v, k ) ) }
                    </Switch>
                </route.component>
            )
        }else
            return <route.component { ...props }/>
    } }/>
}

export default (
    <WrapComponent>
        <Switch>
            {
                routes.map( ( v, k ) => RouteWithSubRoutes( v, k ) )
            }
        </Switch>
    </WrapComponent>
);
