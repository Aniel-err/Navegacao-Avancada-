# App Navegação Avançada

## Navegação do App
O aplicativo utiliza `NavigationContainer` com um `Bottom Tab Navigator` contendo as abas "Home" e "Profile". Dentro da aba "Home", existe um `Stack Navigator` para permitir a navegação interna entre a tela inicial e a tela de "Details". Também está configurado o Deep Linking para aceitar links no formato `meuapp://details/1`.

## Tratamento de UX
Nenhuma tela fica em branco. Os estados foram tratados da seguinte forma:
*   **Loading:** Utilizado nas telas `Home` e `Details` para simular o carregamento de dados com um indicador visual.
*   **Empty:** Tratado na tela `Home`, exibindo uma mensagem caso os dados venham vazios.
*   **Error:** Simulado na tela `Details`, exibindo uma mensagem de falha e um botão de "Tentar Novamente" para reexecutar a ação.
